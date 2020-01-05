CREATE TABLE [dbo].[StoreItem] (
    [StoreItem_PK] INT             IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]     ROWVERSION      NOT NULL,
    [Name]         NVARCHAR (100)  NOT NULL,
    [Description]  NVARCHAR (1000) NULL,
	[Cost]         INT             NOT NULL,
	[ItemCount]    INT             NOT NULL DEFAULT(1),
	[Expiry]       DATETIME2       NULL,
    [CardPack_FK]  INT             NULL,
    CONSTRAINT [PK_StoreItem] PRIMARY KEY CLUSTERED ([StoreItem_PK] ASC),
    CONSTRAINT [FK_StoreItem_CardPack_FK] FOREIGN KEY ([CardPack_FK]) REFERENCES [dbo].[CardPack] ([CardPack_PK])
);

GO
CREATE NONCLUSTERED INDEX [IX_StoreItem_CardPack_FK]
    ON [dbo].[StoreItem]([CardPack_FK] ASC);
