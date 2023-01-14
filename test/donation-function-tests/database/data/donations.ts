type DonationRecord = {
  id: string;
  donation_amount: number;
};

export const donations = [
  {
    id: '1',
    donation_amount: 2000
  },
  {
    id: '2',
    donation_amount: 2000
  },
  {
    id: '3',
    donation_amount: 1000
  },
  {
    id: '4',
    donation_amount: 1000
  }
] as DonationRecord[];
