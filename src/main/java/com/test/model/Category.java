package com.test.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int id; 			//아이디
	
	String code; 		//카테고리 코드
	
	String name; 		//카테고리 명
	
	int depth;			//카테고리 레벨
	
	String pcode;		//부모 카테고리 코드
	
	int sort;			//정렬순서
	
	String display; 	//노출여부(Y/N)

}
