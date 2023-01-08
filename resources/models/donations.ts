import TABLES from "../constants/tables";
import DBService from "../database/DBService"

export const getCountOfDonations = (email: string) => {
    const db = DBService.getConnection();
    return db(`${TABLES.DONATIONS} as d`)
        .join(`${TABLES.USER_DONATION_MAP} as u_d_map`, "d.id", "d.donation_id")
        .join(`${TABLES.USERS} as u`, "u.id", "u_d_map.user_id")
        .count("d.id as count")
        .where("u.email", email)
        .first();
}
