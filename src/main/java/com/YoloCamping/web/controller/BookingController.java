package com.YoloCamping.web.controller;

import com.YoloCamping.domain.dao.booking.Booking;
import com.YoloCamping.domain.dao.booking.BookingRepository;
import com.YoloCamping.service.search.BookingService;
import com.YoloCamping.service.search.SearchService;
import com.YoloCamping.web.dto.BookingDto;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    @ResponseBody
    @PostMapping("/update")
    public boolean booking(@RequestBody BookingDto bookingdto){
        bookingService.save(bookingdto);
        return true;
    }

}
