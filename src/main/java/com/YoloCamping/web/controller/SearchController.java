package com.YoloCamping.web.controller;

import com.YoloCamping.service.search.SearchService;
import com.YoloCamping.web.dto.BookingDto;
import com.YoloCamping.web.dto.CampingDto;
import com.YoloCamping.web.dto.DetailedDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@Controller
@RequestMapping(value={"/camp","/search"})
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/pet")
    public String search_pet_process(Model model){
        model.addAttribute("result",searchService.find_pet_Camping());
        model.addAttribute("cssfile","search_result");
        return "/content/search/result";
    }

    @GetMapping("/{camping}") // 1개의 캠핑장
    public String campingInfo(@PathVariable Long camping,
                              @RequestParam(required = false) Long start, @RequestParam(required = false) Long end,
                              Model model){
        DetailedDto detailedDto = DetailedDto.builder()
                .start(start)
                .end(end)
                .build();

        CampingDto campingDto =  searchService.find_Camping(camping).get(0);
        List<BookingDto> list = searchService.search(detailedDto);

        model.addAttribute("detailed", detailedDto);
        model.addAttribute("result",searchService.intersection(campingDto,list));
        model.addAttribute("cssfile","camping_result");
        return "/content/search/camping";
    }

    @GetMapping("/rest")
    @ResponseBody
    public Map<String, Object> roomRest(@RequestParam Long campingNo, @RequestParam Long start, @RequestParam Long end){
        DetailedDto detailedDto = DetailedDto.builder()
                .start(start)
                .end(end)
                .build();

        CampingDto campingdto = searchService.find_Camping(campingNo).get(0);
        List<BookingDto> list = searchService.search(detailedDto);

        Map<String, Object> map = new HashMap<>();
        map.put("Restcamp", searchService.intersection(campingdto,list));
        return map;
    }

    @PostMapping("/roomSelect")
    @ResponseBody
    public Map<String,Object> search_roomInfo(@RequestBody Map<String,Object> map){
        String roomName = map.get("roomName").toString();
        map.put("result",searchService.find_Room(roomName).get(0));
        return map;
    }

    @GetMapping("/detailed")
    public String detailed(@RequestParam String type,@RequestParam Long start,@RequestParam Long end,
                           @RequestParam String area, Model model){
        DetailedDto detailedDto = DetailedDto.builder()
                .area(area)
                .type(type)
                .start(start)
                .end(end)
                .build();
        model.addAttribute("detailed", detailedDto);
        model.addAttribute("result", searchService.detailed(detailedDto));
        return "/content/search/result";
    }

    @GetMapping("/type")
    public String search_type(@RequestParam String type,@RequestParam Long start,@RequestParam Long end,
                              Model model)
    {
        DetailedDto detailedDto = DetailedDto.builder()
                .type(type)
                .start(start)
                .end(end)
                .build();
        model.addAttribute("detailed", detailedDto);
        model.addAttribute("result", searchService.detailed(detailedDto));
        return "/content/search/result";
    }


}
