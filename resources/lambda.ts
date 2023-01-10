import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { SERVICE_INIT_FAILED } from './constants/errors';
import { ERROR_PARSE_REQ_BODY } from './constants/reqerrors';
import DBService from './database/DBService';
import { getNumberOfDonations } from './models/donations';
import LogService from './services/LogService';
import isValidEmail from './utils/isValidEmail';

const initServices = async () => {
    LogService.initServices();
    const hasDBInitialised = await DBService.initialiseDb();

    return hasDBInitialised;
};

const parseRequestBody = (body: string) => {
    try {
        return JSON.parse(body);
    } catch (err) {
        LogService.logError(ERROR_PARSE_REQ_BODY, err as Error);
        return {};
    }
}

export const main = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    if(!await initServices()) {
        console.log(SERVICE_INIT_FAILED);
    }

    const reqBody = parseRequestBody(event.body as string);
    const userEmail = reqBody.email;

    if(!userEmail || !isValidEmail(userEmail)) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Invalid email address',
            }),
        };
    }

    const donationCount = (await getNumberOfDonations(userEmail))!.count;
    
    if(donationCount && donationCount >= 2){
        //send a SNS message to the user
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            count:donationCount
        })
    };
};