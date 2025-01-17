package com.openclassrooms.mddapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

package com.openclassrooms.mddapi.service.SubjectService;

@SpringBootApplication
public class MddApiApplication {

	@Autowired
	private SubjectService subjectService;

	public static void main(String[] args) {
		SpringApplication.run(MddApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Iterable<Subject> subjects = subjectService.getSubjects();
		subjects.forEach(product -> System.out.println(subjects.getTitle()));

	}

}
