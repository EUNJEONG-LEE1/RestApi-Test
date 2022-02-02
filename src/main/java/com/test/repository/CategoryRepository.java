package com.test.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.test.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer>{

	List<Category> findByCode(String code);
	List<Category> findByPcode(String pcode);
	List<Category> findByNameContaining(String name);
	//List<Category> findByNameContainingAndDepth(String name, Integer depth);
	
	@Query(value="SELECT A.id, A.code, A.name, A.depth, A.pcode, A.sort, A.display "
			+ "FROM category A "
			+ " JOIN "
			+ "(SELECT code FROM category WHERE name like %?% AND depth=1) B ON A.pcode = B.code;", nativeQuery = true )
	List<Category> select1DepthNameChild(String name);
	
	@Transactional
	Integer deleteByIdAndPcode(Integer id, String pcode);

	@Transactional
	Integer deleteByPcode(String pcode);
	
	@Query(value="SELECT sort FROM category WHERE pcode=? AND depth=2 ORDER BY sort DESC Limit 1;", nativeQuery = true)
	Integer selectMaxSortDepth2 (String pCode);


	@Query(value="SELECT sort FROM category WHERE depth=1 ORDER BY sort DESC Limit 1;", nativeQuery = true)
	Integer selectMaxSortDepth1();
	
}
