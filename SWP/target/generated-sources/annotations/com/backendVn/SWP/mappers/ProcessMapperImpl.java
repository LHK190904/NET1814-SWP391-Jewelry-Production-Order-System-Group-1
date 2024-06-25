package com.backendVn.SWP.mappers;

import com.backendVn.SWP.dtos.response.ProcessResponse;
import com.backendVn.SWP.entities.Process;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class ProcessMapperImpl implements ProcessMapper {

    @Override
    public ProcessResponse toProcessResponse(Process process) {
        if ( process == null ) {
            return null;
        }

        ProcessResponse.ProcessResponseBuilder processResponse = ProcessResponse.builder();

        processResponse.id( process.getId() );
        processResponse.requestID( process.getRequestID() );
        processResponse.updatedAt( process.getUpdatedAt() );
        processResponse.updatedBy( process.getUpdatedBy() );
        processResponse.status( process.getStatus() );

        return processResponse.build();
    }
}
