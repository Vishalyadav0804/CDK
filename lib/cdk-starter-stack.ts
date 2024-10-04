import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { CfnOutput, CfnParameter, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id:string, expiration: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expiration)
      }]
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //create s3 bucket in 3 different ways(using constructs)

    //L1 construct
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration:{
        rules:[{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });

    const duration = new CfnParameter(this, 'duration', {
      default : 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number' 
    })

    //L2 construct
    // const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
    //   lifecycleRules:[{
    //     expiration: cdk.Duration.days(2)
    //   }]
    // });

    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules:[{
        expiration: cdk.Duration.days(duration.valueAsNumber)
      }]
    });

    new cdk.CfnOutput(this, 'MyL2BucketName',{
      value: myL2Bucket.bucketName
    });

    //L3 construct
    new L3Bucket(this, 'MyL3Bucket', 3);
  }
}
