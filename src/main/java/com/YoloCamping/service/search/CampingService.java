package com.YoloCamping.service.search;

import com.YoloCamping.domain.dao.search.Camping;
import com.YoloCamping.domain.dao.search.CampingRepository;
import com.YoloCamping.domain.dao.search.Room;
import com.YoloCamping.domain.dao.search.RoomRepository;
import com.YoloCamping.web.dto.CampingDto;
import com.YoloCamping.web.dto.InputRoomDto;
import com.YoloCamping.web.dto.RoomDto;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
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
    }

    @Transactional
    public void camping_save(CampingDto campingDto){
        campingRepository.save(campingDto.toEntity());
        Camping camping = campingRepository.findByCampingName(campingDto.getCampingName());
        roomRepository.saveAll(campingDto.getRoomDto().stream().map(Room ::new).toList());
    }

    @Transactional
    public void room_update(InputRoomDto roomDto){
        Camping camping = campingRepository.findById(roomDto.getCampingNo())
                                                .stream().toList().get(0);

        List<Room> roomlist = roomRepository.findAll();
        ArrayList<RoomDto> arr = roomDto.getRoomList();
        for(int i = 0; i < arr.size(); i++) {
            RoomDto dto = arr.get(i);
            for(int x = 0; x < roomlist.size(); x++){
                Room room = roomlist.get(x);

                if(room.getRoomName().equals(dto.getRoomName())){
                    room.update(dto.getRoomName(),dto.getRoomType(),dto.getRoomInfo(),
                                dto.getRoomMin(),dto.getRoomMax(),dto.getRoomPrice(),dto.getRoomCount());
                    roomlist.remove(x);
                    break;
                }
            }
        }

    }

    @Transactional
    public void room_save(RoomDto roomDto){
        Camping camping = campingRepository.findById(roomDto.getCampingNo()).stream().toList().get(0);
        roomRepository.save(roomDto.toEntity(camping));
    }


}
