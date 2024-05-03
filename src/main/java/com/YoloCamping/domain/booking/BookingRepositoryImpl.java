package com.YoloCamping.domain.booking;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepositoryImpl {

    List<Booking> findBySchedue(LocalDate start, LocalDate end);

    List<Booking> findByConfirm(String name, String phone);

}
