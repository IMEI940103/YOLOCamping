package com.YoloCamping.web.controller;

import com.YoloCamping.service.search.BookingService;
import com.YoloCamping.web.dto.BookingDto;
import com.YoloCamping.web.dto.CampingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    @ResponseBody
    @PostMapping("/update")
    public boolean booking(@RequestBody BookingDto Bookingdto){
        bookingService.save(Bookingdto);
        return true;
    }

    @ResponseBody
    @GetMapping(value = "/confirm")
    public Map<String,Object> confirm(@RequestParam String name, @RequestParam String phone){

        List<BookingDto> blist = bookingService.search(name, phone);
        List<CampingDto> clist = bookingService.confirm_camping(blist);

        Map<String,Object> map = new HashMap<>();
        map.put("booking",blist);
        map.put("camping",clist);

        return map;
    }



}
