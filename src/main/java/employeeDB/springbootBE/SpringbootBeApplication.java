package employeeDB.springbootBE;

import employeeDB.springbootBE.model.Employee;
import employeeDB.springbootBE.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBeApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBeApplication.class, args);
	}
@Autowired
private EmployeeRepository employeeRepository;


	@Override
	public void run(String... args) throws Exception {

	}
}
