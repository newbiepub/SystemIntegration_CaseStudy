import moment from "moment";

export function fromMoment(timestamp) {
    return moment(timestamp).fromNow();
}

export function prettifyDate(timestamp) {
    return moment(timestamp).format("MMM DD, YYYY hh:mm:ss A")
}

export function formatDate(timestamp) {
    return moment(timestamp).format('DD/MM/YYYY');
}