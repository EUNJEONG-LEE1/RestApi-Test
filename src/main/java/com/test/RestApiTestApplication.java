package com.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.test.model.Category;
import com.test.repository.CategoryRepository;



@SpringBootApplication
public class RestApiTestApplication {

	@Autowired
	private CategoryRepository categoryRepository;
	//private CategoryRepository categoryRepository;

	@Bean
	public ApplicationRunner applicationRunner() {
		return new ApplicationRunner() {

			@Override
			public void run(ApplicationArguments args) throws Exception {
				// TODO Auto-generated method stub
				//id, code, name, depth, pcode, sort, display
				categoryRepository.save(new Category(1, "cate1", "상의",1,"",1,"Y"));
				categoryRepository.save(new Category(2, "cate1_1", "반팔 티셔츠",2,"cate1",1,"Y"));
				categoryRepository.save(new Category(3, "cate1_2", "긴팔 티셔츠",2,"cate1",2,"Y"));
				categoryRepository.save(new Category(4, "cate2", "아우터",1,"",2,"Y"));
				categoryRepository.save(new Category(5, "cate3", "바지",1,"",3,"Y"));
				categoryRepository.save(new Category(6, "cate3_1", "데님 팬츠",2,"cate3",1,"Y"));
				categoryRepository.save(new Category(7, "cate4", "원피스",1,"",4,"Y"));
				categoryRepository.save(new Category(8, "cate4_1", "미니 원피스",2,"cate4",1,"Y"));
				categoryRepository.save(new Category(9, "cate4_2", "미디 원피스",2,"cate4",2,"Y"));
				categoryRepository.save(new Category(10, "cate4_3", "맥시 원피스",2,"cate4",3,"Y"));
				categoryRepository.save(new Category(11, "cate2_1", "후드 집업",2,"cate2",1,"Y"));
				categoryRepository.save(new Category(12, "cate2_2", "환절기 코트",2,"cate2",2,"Y"));
				categoryRepository.save(new Category(13, "cate2_3", "겨울 싱글 코트",2,"cate2",3,"Y"));

			}
		};
	}
	
	public static void main(String[] args) {
		SpringApplication.run(RestApiTestApplication.class, args);
	}

}
