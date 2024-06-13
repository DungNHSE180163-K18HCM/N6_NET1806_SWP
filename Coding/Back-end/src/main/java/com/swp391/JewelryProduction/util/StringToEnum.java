package com.swp391.JewelryProduction.util;

import com.swp391.JewelryProduction.enums.ReportType;
import org.springframework.core.convert.converter.Converter;

public class StringToEnum <T extends Enum<T>> implements Converter<String, T> {
    Class<T> enumType;

    public StringToEnum(Class<T> enumType) {
        this.enumType = enumType;
    }

    @Override
    public T convert(String source) {
        try {
            ReportType reportType = ReportType.valueOf(source.toUpperCase());
            return T.valueOf(enumType, source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
