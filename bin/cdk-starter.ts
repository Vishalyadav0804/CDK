#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
//import { CdkStarterStack } from '../lib/cdk-starter-stack';
import {PhotosStack} from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';

const app = new cdk.App();
//new CdkStarterStack(app, 'CdkStarterStack');

// new PhotosStack(app, 'PhotosStack');
// new PhotosHandlerStack(app, 'PhotosHandlerStack');
const photosStack = new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
    targetBucketArn: photosStack.photosBucketArn
})