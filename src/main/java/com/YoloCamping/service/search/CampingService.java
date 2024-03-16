package com.YoloCamping.service.search;

import com.YoloCamping.domain.dao.search.Camping;
import com.YoloCamping.domain.dao.search.CampingRepository;
import com.YoloCamping.domain.dao.search.RoomRepository;
import com.YoloCamping.web.dto.CampingDto;
import com.YoloCamping.web.dto.RoomDto;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CampingService {

    private final CampingRepository campingRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public void camping_update(CampingDto campingDto){
        Camping camping = campingRepository.findByCampingName(campingDto.getCampingName());
        camping.update(campingDto.getCampingInfo(),campingDto.getCampingPhone());
        System.out.println("여기 옴.");
    }

    @Transactional
    public void room_update(RoomDto roomDto){
        Camping camping = campingRepository.findById(roomDto.getCampingNo())
                                                .stream().toList().get(0);
        roomRepository.save(roomDto.toEntity(camping));
    }

    @Transactional
    public void room_save(RoomDto roomDto){
        Camping camping = campingRepository.findById(roomDto.getCampingNo()).stream().toList().get(0);
        roomRepository.save(roomDto.toEntity(camping));
    }


}
