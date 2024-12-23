package ma.xelops.customerthymleafapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(Customizer.withDefaults())
                .authorizeHttpRequests(ar -> ar.requestMatchers("/webjars/**","/images/**","h2-console/**").permitAll())
                .authorizeHttpRequests(ar -> ar.anyRequest().authenticated())
                .oauth2Login(Customizer.withDefaults())
                .logout((logout)->logout
                        .logoutSuccessUrl("/").permitAll()
                        .deleteCookies("JSESSIONID"))
                .build();
    }

    @Bean
    public DefaultOAuth2UserService oAuth2UserService() {
        return new DefaultOAuth2UserService() {
            @Override
            public OAuth2User loadUser(OAuth2UserRequest userRequest) {
                OAuth2User oAuth2User = super.loadUser(userRequest);

                Map<String, Object> attributes = oAuth2User.getAttributes();

                var clientRegistrationId = userRequest.getClientRegistration().getRegistrationId();
                var userNameAttributeName = getUserNameAttributeName(userRequest, clientRegistrationId);

                return new DefaultOAuth2User(
                        oAuth2User.getAuthorities(),
                        attributes,
                        userNameAttributeName
                );
            }

            private static String getUserNameAttributeName(OAuth2UserRequest userRequest, String clientRegistrationId) {
                String userNameAttributeName;
                if ("google".equals(clientRegistrationId)) {
                    userNameAttributeName = "email";
                } else if ("github".equals(clientRegistrationId)) {
                    userNameAttributeName = "login";
                } else {
                    userNameAttributeName = userRequest.getClientRegistration()
                            .getProviderDetails()
                            .getUserInfoEndpoint()
                            .getUserNameAttributeName();
                }
                return userNameAttributeName;
            }
        };
    }
}
