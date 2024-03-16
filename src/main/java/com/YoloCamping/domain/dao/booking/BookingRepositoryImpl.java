package com.YoloCamping.domain.dao.booking;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepositoryImpl {

    List<Booking> findBySchedue(LocalDate start, LocalDate end);

}
