package com.openclassrooms.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Subscription;

@Repository
public interface SubscriptionRepository extends CrudRepository<Subscription, Integer> {

}