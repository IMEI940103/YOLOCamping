package com.YoloCamping.domain.dao.search;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> ,RoomRepositoryImpl {

    @Query("SELECT r FROM Room r WHERE r.roomName = :roomName")
    List<Room> findByRoom(@Param("roomName") String roomName);

}
