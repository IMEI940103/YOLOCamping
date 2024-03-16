package com.YoloCamping.service.search;

import com.YoloCamping.domain.dao.booking.BookingRepository;
import com.YoloCamping.web.dto.BookingDto;
import com.YoloCamping.web.dto.DetailedDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SearchService searchService;

    @Transactional
    public void save(BookingDto bookingDto){
        bookingRepository.save(
                    bookingDto.toEntity(
                            searchService.find_Room(bookingDto.getRoomNo())
                    )
        );
    }



}
