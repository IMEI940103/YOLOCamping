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

    @GetMapping (value = {"yolocamping","yolo"})
    public String home_Page(Model model){
        model.addAttribute("cssfile","home");
        return "home";
    }

    @GetMapping(value = {"관리","admin"})
    public String management_Page(Model model){
        model.addAttribute("result", searchService.find_AllCamping());
        model.addAttribute("cssfile","search_result");
        return "content/management/home";
    }

}
