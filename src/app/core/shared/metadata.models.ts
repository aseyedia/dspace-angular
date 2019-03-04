import * as uuidv4 from 'uuid/v4';
import { autoserialize, Serialize, Deserialize } from 'cerialize';
/* tslint:disable:max-classes-per-file */

/** A map of metadata keys to an ordered list of MetadataValue objects. */
export class MetadataMap {
  [key: string]: MetadataValue[];
}

/** A single metadata value and its properties. */

export class MetadataValue {
  /** The uuid. */
  uuid: string = uuidv4();

  /** The language. */
  @autoserialize
  language: string;

  /** The string value. */
  @autoserialize
  value: string;
}

/** Constraints for matching metadata values. */
export interface MetadataValueFilter {
  /** The language constraint. */
  language?: string;

  /** The value constraint. */
  value?: string;

  /** Whether the value constraint should match without regard to case. */
  ignoreCase?: boolean;

  /** Whether the value constraint should match as a substring. */
  substring?: boolean;
}

export class MetadatumViewModel {
  /** The uuid. */
  uuid: string = uuidv4();

  /** The metadatafield key. */
  key: string;

  /** The language. */
  language: string;

  /** The string value. */
  value: string;

  /** The order. */
  order: number;
}

/** Serializer used for MetadataMaps.
 * This is necessary because Cerialize has trouble instantiating the MetadataValues using their constructor
 * when they are inside arrays which also represent the values in a map.
 */
export const MetadataMapSerializer = {
  Serialize(map: MetadataMap): any {
    const json = {};
    Object.keys(map).forEach((key: string) => {
      json[key] = Serialize(map[key], MetadataValue);
    });
    return json;
  },

  Deserialize(json: any): MetadataMap {
    const metadataMap: MetadataMap = {};
    Object.keys(json).forEach((key: string) => {
      metadataMap[key] = Deserialize(json[key], MetadataValue);
    });
    return metadataMap;
  }
};
/* tslint:enable:max-classes-per-file */
