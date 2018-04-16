export function searchLocation(location) {
  let locationSearch;
  if (location) {
    locationSearch = {
      $ilike: `%${location}%`,
    };
    return locationSearch;
  }
  locationSearch = {
    $ne: null,
  };
  return locationSearch;
}

export function searchFacilities(facilities) {
  let facilitySearch;
  if (facilities) {
    const facility = facilities.toLowerCase();
    facilitySearch = {
      $contains: [facility],
    };
    return facilitySearch;
  }
  facilitySearch = {
    $ne: null,
  };
  return facilitySearch;
}

export function searchCapacity(capacityType, btwValue, capacity) {
  let capacitySearch;
  switch (capacityType) {
    case 'greater': {
      capacitySearch = {
        $gt: capacity,
      };
      return capacitySearch;
    }
    case 'lesser': {
      capacitySearch = {
        $lt: capacity,
      };
      return capacitySearch;
    }
    case 'equal': {
      capacitySearch = {
        $eq: capacity,
      };
      return capacitySearch;
    }
    case 'between': {
      capacitySearch = {
        $between: [capacity, btwValue],
      };
      return capacitySearch;
    }
    default: {
      capacitySearch = {
        $ne: null,
      };
      return capacitySearch;
    }
  }
}
