package com.YoloCamping.web.controller;

import com.YoloCamping.domain.dao.search.RoomRepository;
import com.YoloCamping.service.search.CampingService;
import com.YoloCamping.service.search.SearchService;
import com.YoloCamping.web.dto.CampingDto;
import com.YoloCamping.web.dto.RoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/manager")
@Controller
public class ManagementController {

    private final SearchService searchService;
    private final CampingService campingService;

    @GetMapping("/{campingNo}")
    public String campingInfo(@PathVariable Long campingNo, Model model){
        model.addAttribute("result",searchService.find_Camping(campingNo).get(0));
        model.addAttribute("cssfile","camping_result");
        return "content/management/info";
    }

    @PutMapping("/camp/update")
    @ResponseBody
    public String update_c(@RequestBody CampingDto campingDto){
        campingService.camping_update(campingDto);
        return "success";
    }

    @PutMapping("/room/update")
    @ResponseBody
    public String update_r(@RequestBody RoomDto roomDto){
        return "success";

    }

    @PostMapping("/room/save")
    @ResponseBody
    public String save_r(@RequestBody RoomDto roomDto){
        campingService.room_save(roomDto);
        return "success";
    }

/*
    @DeleteMapping
    @ResponseBody
    public void delect_r(){

    }
*/


}
