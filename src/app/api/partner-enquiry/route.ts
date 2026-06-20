import { NextRequest, NextResponse } from "next/server";

interface PartnerEnquiry {
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  website?: string;
  city: string;
  state: string;
  partnerTypes: string[];
  existingBusiness: string;
  yearsInBusiness: string;
  teamSize: string;
  healthcareClients?: string;
  regionsOfInterest: string[];
  currentProducts?: string;
  whyPartner?: string;
  hearAboutUs: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnerEnquiry = await request.json();

    // Validate required fields
    const requiredFields = [
      "companyName",
      "contactPerson",
      "designation",
      "email",
      "phone",
      "city",
      "state",
      "partnerTypes",
      "existingBusiness",
      "yearsInBusiness",
      "teamSize",
      "regionsOfInterest",
      "hearAboutUs",
    ];

    for (const field of requiredFields) {
      if (!body[field as keyof PartnerEnquiry]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone format (basic Indian phone validation)
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const cleanPhone = body.phone.replace(/[\s\-]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Log the enquiry (in production, this would go to a CRM/database)
    console.log("Partner Enquiry Received:", {
      timestamp: new Date().toISOString(),
      ...body,
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification to partner team
    // 3. Send confirmation email to applicant with Partner Kit PDF
    // 4. Create CRM ticket (HubSpot, Freshsales, etc.)

    // Simulate async operations
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "Partner application received successfully",
      data: {
        companyName: body.companyName,
        email: body.email,
        referenceId: `PARTNER-${Date.now()}`,
      },
    });
  } catch (error) {
    console.error("Partner enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process partner application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Partner Enquiry API",
    endpoints: {
      POST: "Submit a partner application",
    },
  });
}
