package online.be.model.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DayOffRequest {
    LocalDate dayOff;
    long dentistId;
    long slotId;
}
