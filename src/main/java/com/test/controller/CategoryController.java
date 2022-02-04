package com.test.controller;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.model.Category;
import com.test.repository.CategoryRepository;


@RestController
public class CategoryController {

	@Autowired(required = true)
	private CategoryRepository categoryRepository;
	
	private final Logger log = Logger.getGlobal();
	
	//@RequestMapping("category")
	@GetMapping("category")
	public List<Category> getCategories(){
		return categoryRepository.findAll();
	}
	
	@RequestMapping("category/id/{id}")
	public Category getCategoryById(@PathVariable("id") int id) {
		return categoryRepository.findById(id).get();
	}
	
	//검색
	@RequestMapping("category/search/{searchVal}")
	public List<Category> getCategoryBySearchVal(@PathVariable("searchVal") String searchVal) {

	List<Category> resultList = Stream.concat(
			categoryRepository.findByNameContaining(searchVal).stream()
			, categoryRepository.select1DepthNameChild(searchVal).stream()
			).distinct().collect(Collectors.toList());
		
		return resultList;
	}
	
	
	@RequestMapping("category/code/{cateCode}")
	public List<Category> getCategoryByCode(@PathVariable("cateCode") String cateCode) {
		
		List<Category> resultList = Stream.concat(categoryRepository.findByCode(cateCode).stream(), categoryRepository.findByPcode(cateCode).stream())
				.collect(Collectors.toList());
		
		return resultList;
	}
	
	//수정
	@PutMapping("/category/edit/{id}")
	public void editCategoryById(@PathVariable("id") int id, @RequestBody String editName) {
		Category category = categoryRepository.findById(id).get();
		category.setName(editName);
		categoryRepository.save(category);
	}

	//삭제-1depth
	@DeleteMapping("/category/delete1Depth")
	public void deleteCategory1Depth(@RequestBody Category category) {	
		Integer id =  category.getId();
		String pcode = category.getPcode();		
		categoryRepository.deleteByPcode(pcode);
		categoryRepository.deleteById(id);
	}
	
	//삭제-2depth
	@DeleteMapping("/category/{id}")
	public void deleteCategoryById(@PathVariable("id") int id) {
		categoryRepository.deleteById(id);
	}
	
	//자식노드의 최대 sort 가져오기 - 2Depth
	@GetMapping("category/selectMaxSort/{pCode}")
	public Integer selectMaxSortDepth2(@PathVariable("pCode") String pCode) {
		return categoryRepository.selectMaxSortDepth2(pCode);
	}
	
	//자식노드의 최대 sort 가져오기 - 2Depth
	@GetMapping("category/selectMaxSort")
	public Integer selectMaxSortDepth1() {
		return categoryRepository.selectMaxSortDepth1();
	}
	
	
	
	//추가
	@PutMapping("/category/add")
	public Integer addCategoryById(@RequestBody Category category) {		
		categoryRepository.save(category);
		return category.getId();
			
	}
	
	
}
