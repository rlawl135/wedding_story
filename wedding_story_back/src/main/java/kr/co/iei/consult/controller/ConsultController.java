package kr.co.iei.consult.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.annotation.MultipartConfig;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.consult.model.service.ConsultService;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.product.model.dto.ProductDTO;


@RestController
@CrossOrigin("*")
@RequestMapping("/consult")
public class ConsultController {

	@Autowired
	private ConsultService consultService;
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value = "/memberNo/{memberNo}")
	public ResponseEntity<MemberDTO>selectMemberConsult(@PathVariable int memberNo){
		MemberDTO member = consultService.selectMemberConsult(memberNo);
		return ResponseEntity.ok(member);
	}
	
	@GetMapping(value = "/productNo/{productNo}")
	public ResponseEntity<ProductDTO>selectProductName(@PathVariable int productNo){
		ProductDTO product = consultService.selectProductName(productNo);
		return ResponseEntity.ok(product);
	}

	@PostMapping
	 public ResponseEntity<Integer> insertConsult(@ModelAttribute ConsultDTO consult ,@ModelAttribute MemberDTO member, @ModelAttribute ProductDTO product) {
        int result = consultService.insertConsult(consult,member,product);
        System.out.println("consult : "+consult);
        System.out.println("member : "+member);
        return ResponseEntity.ok(result);
    }
	
    
}
