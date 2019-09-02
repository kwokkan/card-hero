CREATE TABLE [dbo].[GameType] (
    [GameType_PK] INT             IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (100)  NOT NULL,
    [Description] NVARCHAR (1000) NULL,
    CONSTRAINT [PK_GameType] PRIMARY KEY CLUSTERED ([GameType_PK] ASC)
);

