package org.example.services;

import org.example.entities.Regularity;
import org.example.repositories.RegularityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RegularityServiceImpl implements RegularityService{
    private final RegularityRepository regularityRepository;

    public RegularityServiceImpl(RegularityRepository regularityRepository) {
        this.regularityRepository = regularityRepository;
    }

    @Override
    public List<Regularity> findAll() {
        return regularityRepository.findAll();
    }
}
