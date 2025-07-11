// /pages/data/dummyArtisanServices.js
import { v4 as uuidv4 } from "uuid";

const dummyArtisanServices = {
  artisanId: "artisan-123",
  services: [
    {
      id: uuidv4(),
      service: "Wiring",
      description: "Professional wiring service",
      price: "$30/hr",
      estimatedTime: "Varies by project",
    },
    {
      id: uuidv4(),
      service: "Installations",
      description: "Professional installations service",
      price: "$30/hr",
      estimatedTime: "Varies by project",
    },
    {
      id: uuidv4(),
      service: "Repairs",
      description: "Professional repairs service",
      price: "$30/hr",
      estimatedTime: "Varies by project",
    },
    {
      id: uuidv4(),
      service: "Safety Inspections",
      description: "Professional safety inspections service",
      price: "$30/hr",
      estimatedTime: "Varies by project",
    },
  ],
  pricingNotes: `Prices are estimates and may vary based on project complexity
  Minimum service charge: 1 hour
Materials not included in pricing
Free quotes available upon request`
};

export default dummyArtisanServices;
