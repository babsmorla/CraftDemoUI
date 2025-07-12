const dummyVerificationRequest = {
  artisanId: "artisan-123",
  status: "pending", // other possible values: 'approved', 'rejected', 'in_review'

  submittedAt: "2025-07-12T10:30:00Z",

  documents: [
    {
      id: 1,
      title: "National ID Card",
      type: "id",
      idType: "national_id",
      files: [
        {
          name: "national_id_front.jpg",
          url: "/uploads/national_id_front.jpg",
        },
        {
          name: "national_id_back.jpg",
          url: "/uploads/national_id_back.jpg",
        },
      ],
      status: "approved", // individual doc status
      comments: "Valid and clear copy.",
    },
    {
      id: 2,
      title: "Proof of Address",
      type: "address",
      files: [
        {
          name: "water_bill.pdf",
          url: "/uploads/water_bill.pdf",
        },
      ],
      status: "in_review",
      comments: "",
    },
    {
      id: 3,
      title: "Business Registration",
      type: "business",
      files: [],
      status: "missing",
      comments: "Optional document not provided.",
    },
    {
      id: 4,
      title: "Professional Certifications",
      type: "certification",
      files: [
        {
          name: "trade_cert.pdf",
          url: "/uploads/trade_cert.pdf",
        },
      ],
      status: "rejected",
      comments: "Certificate expired. Please upload a valid one.",
    },
  ],
};

export default dummyVerificationRequest;
