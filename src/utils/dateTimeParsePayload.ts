import moment from "moment"
export const parseDateToPayload = ({ startDate, endDate }: { startDate: string, endDate: string }, format: string) => {
    if (startDate && endDate) {
        const parsedStartDate = moment(startDate, format, true)
        const parsedEndDate = moment(endDate, format, true)
        if (!parsedStartDate.isValid() || !parsedEndDate.isValid) {
            return !parsedStartDate.isValid() ? "Start Date is Not Valid" : "End Date is Not Valid"
        }
        const [newStartDate, startTime] = startDate.split('~')
        const [newEndDate, endTime] = endDate.split('~')

        const payload = {
            startDate: newStartDate,
            endDate: newEndDate,
            startTime,
            endTime
        }
        return payload
    }
}