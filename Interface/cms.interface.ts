interface Landingpagelist {
  title: string;
  description: string;
  image: File;
  // data: any;
  totalPages: number;
  id: string;
}

interface CreatePayload {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number;
}

interface CreateResponse {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number;
}

interface EditResponse {
    title: string;
    description: string;
    success: boolean;
    message: string;
    status: number;
  }
interface GetLandingPageListParams {
  page: number;
  perPage: number;
  data:object

}

interface LandingPageDetails {
    success: boolean;
    message: string;
    status: number;
    page: number;
    perPage: number;
  }

export interface IGetLandingPage extends GetLandingPageListParams {
  data: GetLandingPageListParams;
}

export interface ILandingPageList extends Landingpagelist {
  data: Landingpagelist;
}

export interface ICreatePayload extends CreatePayload {
  data: CreatePayload;
}

export interface ICreateResponse extends CreateResponse {
  data: CreateResponse;
}

export interface IuserEditResponse extends EditResponse {
    data: EditResponse;
  }


  export interface ILandingPageDetails extends LandingPageDetails {
    data: LandingPageDetails;
  }