package com.lemon.jee.common.utils;

import java.io.IOException;
import java.math.BigDecimal;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

@Component
public class JsonBigDecimalSerializer extends JsonSerializer<BigDecimal> {

	@Override
	public void serialize(BigDecimal decimalVale, JsonGenerator gen,
			SerializerProvider provider) throws IOException,
			JsonProcessingException {

		String result = String.valueOf(decimalVale);

		gen.writeString(result);
	}
}
