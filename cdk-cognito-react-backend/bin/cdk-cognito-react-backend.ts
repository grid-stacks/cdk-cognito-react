#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkCognitoReactBackendStack } from "../lib/cdk-cognito-react-backend-stack";

const app = new cdk.App();
new CdkCognitoReactBackendStack(app, "CdkCognitoReactBackendStack");
