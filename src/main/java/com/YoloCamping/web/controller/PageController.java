package com.YoloCamping.web.controller;

import com.YoloCamping.service.search.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/")
public class PageController {

    final private SearchService searchService;

    @GetMapping (value = {"yolocamping","yolo"}) // 사용자 페이지
    public String home_Page(Model model){

        return "home";
    }

    @GetMapping(value = {"관리","admin"}) // 관리자페이지
    public String management_Page(Model model){
        model.addAttribute("result", searchService.find_AllCamping());
        return "content/management/home";
    }

    @GetMapping("camp/add") // 캠핑장 등록페이지
    public String addCamp_Page(){
        return "content/management/add";
    }

    @GetMapping("confirm") // 예약 확인 페이지
    public String confirm_Page(){
        return "content/service/confirm";
    }
}
