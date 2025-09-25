// src/utils/audit-logging.ts
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { logger } from './logger';
import { UserInputError } from 'apollo-server-errors';

// Define audit log types
enum AuditLogTypes {
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  ROLE_CHANGED = 'ROLE_CHANGED',
  ACCESS_GRANTED = 'ACCESS_GRANTED',
  ACCESS_DENIED = 'ACCESS_DENIED',
}

// Define user roles
enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

// Define sensitive routes
enum SensitiveRoutes {
  CREATE_USER = '/users',
}

class AuditedObject {
  // Store the original object
  private originalObject: any;
  // Store the changed fields of the object
  private changedFields: string[];
  // Store the previous value of each field
  private previousValues: { [key: string]: any };

  constructor(originalObject) {
    this.originalObject = originalObject;
    this.changedFields = [];
    this.previousValues = {};
  }

  // Method to track changed fields
  public trackChange(fieldName: string, newValue: any) {
    // If the field was not changed, ignore it
    if (this.originalObject[fieldName] === newValue) {
      return;
    }
    // Update the changed fields and previous values dictionaries
    this.changedFields.push(fieldName);
    if (this.previousValues[fieldName] === undefined) {
      this.previousValues[fieldName] = this.originalObject[fieldName];
    } else {
      this.changedFields.push(`${fieldName}_previous_value`);
    }
  }

  // Method to log audit records
  public logAudit(event: string) {
    const auditLogRecord = {
      type: event,
      object: this.originalObject,
      fields: this.changedFields.reduce(
        (acc, fieldName) => {
          acc[fieldName] = this.previousValues[fieldName];
          return acc;
        },
        {}
      ),
      timestamp: new Date(),
    };
    // Log the audit record
    logger.info(auditLogRecord);
  }
}

class AuditLogger {
  private auditLogs: Array<any>;

  constructor() {
    this.auditLogs = [];
  }

  public log(event: string, data: any) {
    // Create a new audited object
    const auditedObject = new AuditedObject(data);
    // Log the audit event
    auditedObject.logAudit(event);
    // Store the audit log
    this.auditLogs.push(auditedObject);
  }

  public getAuditLogs() {
    return this.auditLogs;
  }
}

// Export the audit logger
export const auditLogger: AuditLogger = new AuditLogger();

// Define the context to verify JWT token
const secretKey = Buffer.from(config.JWT_SECRET, 'utf-8');
const jwtVerifyOptions = {
  ignoreExpiration: true,
};

// Export the verify token function
export function verifyToken(token: string): any {
  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, secretKey, jwtVerifyOptions);
    return decodedToken;
  } catch (error) {
    return null;
  }
}

// Define the function to log login events
export function logLoginEvent(user: any, success: boolean): void {
  const userRole = user.role;
  const auditLogType = success ? AuditLogTypes.LOGIN_SUCCESS : AuditLogTypes.LOGIN_FAILURE;
  const auditLogRecord = {
    username: user.username,
    success: success,
    role: userRole,
    timestamp: new Date(),
  };
  logger.info(auditLogRecord);
}

// Define the function to log role changes
export function logRoleChange(user: any, newRole: string): void {
  const userRole = user.role;
  const auditLogRecord = {
    username: user.username,
    oldRole: userRole,
    newRole: newRole,
    timestamp: new Date(),
  };
  logger.info(auditLogRecord);
}

// Define the function to log access to sensitive routes
export function logAccessToSensitiveRoute(route: string, user: any): void {
  const userRole = user.role;
  const auditLogRecord = {
    username: user.username,
    route: route,
    role: userRole,
    timestamp: new Date(),
  };
  logger.info(auditLogRecord);
}