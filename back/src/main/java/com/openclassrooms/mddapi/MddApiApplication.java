package com.openclassrooms.mddapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.openclassrooms.mddapi.service.SubjectService;
import com.openclassrooms.mddapi.model.Subject;

@SpringBootApplication
public class MddApiApplication {

	@Autowired
	private SubjectService subjectService;

	public static void main(String[] args) {

		SpringApplication.run(MddApiApplication.class, args);
	}


//	public void run(String... args) throws Exception {
//		Iterable<Subject> subjects = subjectService.getSubjects();
//		subjects.forEach(subject -> System.out.println(subject.getTitle()));
//
//	}

}
