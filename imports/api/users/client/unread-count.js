import { Mongo } from "meteor/mongo";

export const UnreadCount = new Mongo.Collection("unread-count");

window.UnreadCount = UnreadCount;
