#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RecruitmentStack } from '../lib/recruitment-stack';

const app = new cdk.App()

new RecruitmentStack(app, 'RecruitmentStack', {});