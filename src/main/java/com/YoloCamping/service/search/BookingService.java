package com.YoloCamping.service.search;

import com.YoloCamping.domain.dao.booking.BookingRepository;
import com.YoloCamping.domain.dao.search.Camping;
import com.YoloCamping.web.dto.BookingDto;
import com.YoloCamping.web.dto.CampingDto;
import com.YoloCamping.web.dto.RoomDto;
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
    public void save(BookingDto Bookingdto){
        bookingRepository.save( Bookingdto.toEntity());
    }

    public List<BookingDto> search(String name, String phone){
        List<BookingDto> bookinglist =
                bookingRepository.findByConfirm(name, phone)
                        .stream().map(BookingDto ::new)
                        .collect(Collectors.toList());
        return bookinglist;
    }

    public List<CampingDto> confirm_camping(List<BookingDto> blist){
        List<CampingDto> campingList = searchService.find_AllCamping();

        for(int i = 0; i < blist.size(); i++) {
            BookingDto bto = blist.get(i);

            for(int x = 0; x < campingList.size(); x++){
                CampingDto cto = campingList.get(x);
                List<RoomDto> rlist = cto.getRoomDto();

                for(int y = 0; y < rlist.size(); y++){
                    RoomDto rto = rlist.get(y);

                    if(!rto.getRoomNo().equals(bto.getRoomNo())){
                        rlist.remove(y);
                    }
                }
            }
        }

        return campingList;
    }


}
