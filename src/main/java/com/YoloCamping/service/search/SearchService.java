package com.YoloCamping.service.search;

import com.YoloCamping.domain.dao.booking.BookingRepository;
import com.YoloCamping.domain.dao.search.Camping;
import com.YoloCamping.domain.dao.search.CampingRepository;
import com.YoloCamping.domain.dao.search.Room;
import com.YoloCamping.domain.dao.search.RoomRepository;
import com.YoloCamping.web.dto.BookingDto;
import com.YoloCamping.web.dto.CampingDto;
import com.YoloCamping.web.dto.DetailedDto;
import com.YoloCamping.web.dto.RoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Book;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true) // 트랜잭션범위는 유지하되 조회기능만 가능하게함. 조회속도향상.
@Service
public class SearchService {

    private final CampingRepository campingRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public List<CampingDto> detailed(DetailedDto detailedDto){

        List<BookingDto> bookinglist = search(detailedDto);
        List<CampingDto> typeList =
                campingRepository.findByCampingType(detailedDto.getType())
                        .stream()
                        .map(CampingDto::new).collect(Collectors.toList());
                ;


        for(int i= 0; i < typeList.size(); i++){
            CampingDto campingDto = typeList.get(i);

            // 예약이 꽉 찬 객실 분류
            intersection(campingDto, bookinglist);


        }// for - campinglist

        return typeList;

    }

    // 예약 꽉 찬 객실 분류 (count 변수확인)
    public CampingDto intersection(CampingDto campingDto,List<BookingDto> bookingDtos){

        List<RoomDto> roomDtos = campingDto.getRoomDto();
        int count;

        for(int y = 0; y < roomDtos.size(); y++) {
            RoomDto room = roomDtos.get(y);
            count = room.getRoomCount();

            for(int x = 0 ; x < bookingDtos.size() && count > 0; x++) {
                BookingDto dto = bookingDtos.get(x);

                if (room.getRoomNo().equals(dto.getRoomNo())){
                    room.setRoomCount(--count);
                }//if

            }// for - bookinglist

        }// for - rooms

        return campingDto;
    }

    // 예상날짜와 겹치는 예약리스트
    public List<BookingDto> search(DetailedDto detailedDto){
        Date startTmp = new Date(detailedDto.getStart());
        LocalDate start = LocalDate.of(startTmp.getYear() + 1900,startTmp.getMonth()+1,startTmp.getDate());
        start.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        Date endTmp = new Date(detailedDto.getEnd()); // LocalDate Month 1~12... Date Month 0~11
        LocalDate end = LocalDate.of(endTmp.getYear() + 1900, endTmp.getMonth()+1, endTmp.getDate());
        end.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        return bookingRepository.findBySchedue(start,end)
                .stream()
                .map(BookingDto::new).collect(Collectors.toList());
    }

    public List<CampingDto> find_pet_Camping(){
        return campingRepository.findByCampingPet()
                .stream()
                    .map(CampingDto::new).collect(Collectors.toList());
    }

    public List<CampingDto> find_Camping(Long camping){
        return campingRepository.findById(camping)
                .stream()
                    .map(CampingDto::new).collect(Collectors.toList());
    }

    public List<CampingDto> find_AllCamping(){
        return campingRepository.findAll()
                .stream()
                    .map(CampingDto::new).collect(Collectors.toList());
    }

    public List<RoomDto> find_Room(String name){
        return roomRepository.findByRoom(name)
                .stream()
                    .map(RoomDto::new).collect(Collectors.toList());
    }

    public Room find_Room(Long roomNo){
        return roomRepository.findById(roomNo).get();
    }



}
