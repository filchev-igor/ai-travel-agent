export interface TripData {
  start: string;
  end: string;
  startDate: string;
  endDate: string;
  group: string;
  budget: string;
}

export interface TripVariant {
  title: string;
  activities: string;
  flight: number;
  transportation: number;
  hospitality: number;
  activity1_name: string;
  activity1_cost: number;
  activity2_name: string;
  activity2_cost: number;
  total: number;
}

export type RootStackParamList = {
  Home: undefined;
  Loading: { tripData: TripData };
  Results: { tripData: TripData; variants: TripVariant[] };
  Reservation: { tripData: TripData; variant: TripVariant };
  Booking: { tripData: TripData; variant: TripVariant };  // ✅ Add this line
  Success: undefined;
};