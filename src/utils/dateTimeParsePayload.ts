export const parseDateToPayload = ({ startDate, endDate }: { startDate: string, endDate: string }) => {
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