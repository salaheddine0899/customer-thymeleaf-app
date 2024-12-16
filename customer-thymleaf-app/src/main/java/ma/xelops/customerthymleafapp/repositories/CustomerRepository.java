package ma.xelops.customerthymleafapp.repositories;

import ma.xelops.customerthymleafapp.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository  extends JpaRepository<Customer,Integer> {
}
