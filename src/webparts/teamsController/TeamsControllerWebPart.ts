import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TeamsControllerWebPartStrings';
import TeamsController from './components/TeamsController/TeamsController';
import { ITeamsControllerProps } from './components/TeamsController/ITeamsControllerProps';
import GraphCall from '../Graph/GraphCall';
export interface ITeamsControllerWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class TeamsControllerWebPart extends BaseClientSideWebPart<ITeamsControllerWebPartProps> {
  public context: WebPartContext;
  private GraphService = new GraphCall();
  public async onInit(): Promise<void> {
    await this.GraphService.init(this.context);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ITeamsControllerProps> =
      React.createElement(TeamsController, {
        description: this.properties.description,
        context: this.context,
        GraphService: this.GraphService,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
