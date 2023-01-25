import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
} from 'firebase-admin/firestore';

type BaseModel = {
  id: string;
};

export const modelConverter = <T extends BaseModel>(): FirestoreDataConverter<T> => ({
  toFirestore: (modelObject: PartialWithFieldValue<T>): DocumentData => {
    const { id, ...doc } = modelObject;
    return doc;
  },
  fromFirestore: (snapshot) =>
    ({
      id: snapshot.id,
      ...snapshot.data(),
    } as T),
});
