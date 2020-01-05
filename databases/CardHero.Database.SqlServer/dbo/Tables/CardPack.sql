CREATE TABLE [dbo].[CardPack] (
    [CardPack_PK] INT             IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]    ROWVERSION      NOT NULL,
    [Name]        NVARCHAR (100)  NOT NULL,
    [Description] NVARCHAR (1000) NULL,
    CONSTRAINT [PK_CardPack] PRIMARY KEY CLUSTERED ([CardPack_PK] ASC)
);
GO
